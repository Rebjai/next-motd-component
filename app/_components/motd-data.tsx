'use client'
import { useMachine } from "@xstate/react";
import { useEffect, useState } from "react";
import { MachineConfig, createMachine } from "xstate";
import { motdStateMachine } from "./motdMachine";
import { motdStorage } from "./motd-storage";
import { log } from "console";

interface IMotdDataProps { 
    motd: string;
}


const MotdData = ( {motd} : IMotdDataProps) => {
    // use machine to manage state
    // passing in motdStorage as context (IStorage implementation)
    const [stateMachine, send] = useMachine(motdStateMachine, { input: { store: motdStorage, motd  } });

    // change to state "edit" when double clicked
    const handleDoubleClick = () => {
        send({ type: "edit" });
    };

    // send change event to update value
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        send({ type: "change", value: e.target.value });
    };

    // save motd to storage on state change
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            send({ type: "submit" });
        }
    }
    return (
        <>
            {
                stateMachine.value === "loading" &&
                <p className="text-white text-2xl animate-pulse">Loading...</p>
            }

            {
                stateMachine.value === "display" &&
                <div onDoubleClick={handleDoubleClick} className="text-white text-2xl hover:animate-pulse">
                    <p>{stateMachine.context.motd}</p>
                </div>
            }
            {
                stateMachine.value === "edit" &&
                <div>
                    <input
                        type="text"
                        className="text-black p-2 text-center w-full text-xl"
                        placeholder="What is your focus for today?"
                        value={stateMachine.context.motd}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            }
        </>
    );
}

export default MotdData;