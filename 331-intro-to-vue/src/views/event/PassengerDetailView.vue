<!-- components/PassengerDetail.vue -->
<script setup lang="ts">
import {type PropType } from 'vue';
import type { Passenger } from '@/type';

defineProps({
    passenger: {
        type: Object as PropType<Passenger>,
        required: true
    }
})
</script>

<template>
  <div v-if="passenger">
    <h1>{{ passenger.first_name }} {{ passenger.last_name }}</h1>
    <p>Email: {{ passenger.email }}</p>
    <p>Gender: {{ passenger.gender }}</p>
    <p>IP Address: {{ passenger.ip_address }}</p>
    <p>Source: {{ passenger.Source }}</p>
    <p>Destination: {{ passenger.Destination }}</p>
    <p>Travel Date: {{ new Date(passenger.travelDate).toLocaleDateString() }}</p>
    <p>Airline ID: {{ passenger.airlineId }}</p>
  </div>
</template>
