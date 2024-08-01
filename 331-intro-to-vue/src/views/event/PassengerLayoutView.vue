<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePassengerStore } from '@/stores/passenger';

const storePassenger = usePassengerStore()
const { passenger }  = storeToRefs(storePassenger)

</script>

<template>
    <div v-if="passenger">

        <div id="nav">
        <RouterLink :to="{name: 'passenger-detail'}">Details</RouterLink> |
        <RouterLink :to="{name: 'passenger-airline'}">Airline</RouterLink> |
        <RouterLink :to="{name: 'passenger-edit'}">Edit</RouterLink>
       </div>
        
        <RouterView :passenger="passenger" ></RouterView>
    </div>
</template>