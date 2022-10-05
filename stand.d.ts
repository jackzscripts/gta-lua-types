import { Hash, EntityHandle, Vector3 } from "./natives.js";

export declare namespace util {
    function yield(ms?: number): void
    function joaat(name: string): Hash
}

export declare namespace entities {
    function create_vehicle(hash: Hash, pos: Vector3, heading: number): EntityHandle
}