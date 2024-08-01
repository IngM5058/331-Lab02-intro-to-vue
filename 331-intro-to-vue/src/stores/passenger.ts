import type { PassengerState, Passenger } from "@/type";
import { defineStore } from "pinia";
export const usePassengerStore = defineStore('passenger', {
    state: (): PassengerState => ({
        passenger: null
    }),
    actions: {
        setPassenger(passenger: Passenger): void {
            this.passenger = passenger
        }
    }
})