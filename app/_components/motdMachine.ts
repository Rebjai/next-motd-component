import { assign, fromPromise, fromTransition, setup } from 'xstate';
import { IStorage } from './motd-storage';

export const motdStateMachine = setup({
    types: {
        input: {} as { motd: string | undefined, store: IStorage },
        context: {} as { motd: string, motdStorage: IStorage },
        events: {} as
            | {
                type: 'edit';
            }
            | {
                type: 'change';
                value: string;
            }
            | { type: 'submit' }
    },
    guards: {
        motdValid: ({ context }) => context.motd.length > 0
    },
    actions:
    {
        saveMotd: ({ context }) => {
            context.motdStorage.setMotd(context.motd);
        }
    },
}).createMachine({
    id: 'motd',
    initial: 'loading',
    context: ({ input }) => ({
        motd: input.motd ?? '',
        motdStorage: input.store
    }),
    states: {
        loading: {
            invoke: {
                input: ({ context }) => ({ store: context.motdStorage, value: context.motd }),
                // check if server passed a default value
                src: fromPromise(({ input }) => input.value? input.value : input.store.getMotd()),
                onDone: {
                    target: 'display',
                    actions: assign({
                        motd: ({ event }) => event.output
                    })
                },
                onError: {
                    target: 'edit'
                }
            }
        },
        edit: {
            on: {
                change: {
                    actions: assign({
                        motd: ({ event }) => {
                            console.log("Changing motd: " + event.value);
                            
                            return event.value
                        }
                    })
                },
                submit: {
                    guard: 'motdValid',
                    actions: 'saveMotd',
                    target: 'display'
                }
            }
        },
        display: {
            on: {
                edit: 'edit'
            }
        }
    },
});
