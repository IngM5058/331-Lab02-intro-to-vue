<script setup lang="ts">
import type { Passenger } from '@/type';
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';

const props = defineProps<{
    passenger: Passenger
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { passenger } = toRefs(props)
const router = useRouter()
const store = useMessageStore()
const edit = () => {
    store.updateMessage('You are succesfully update the data for ' + props.passenger.first_name)
    setTimeout(() => {
        store.resetMessage()
    }, 3000)
    router.push({ name: 'passenger-list-view', params: { id: props.passenger.id } })
}


</script>

<template>
    <button @click="edit">Edit</button>
</template>