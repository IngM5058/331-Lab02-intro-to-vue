<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import Event from '@/types/Event'
import { ref, onMounted, computed } from 'vue'
import EventService from '@/services/EventService'

const events = ref<Event[]>(null)

const props = defineProps({
  page: {
    type: Number,
    required: true,
  }
})

const page = computed(() => props.page)

onMounted(() => {
  EventService.getEvents(2, page.value)
    .then((response) => {
      console.log(response.data)
      events.value = response.data
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>

<template>
  <div class="home">
    <h1>Events For Good</h1>
    <!-- new element -->
    <div class="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
    <RouterLink :to="{ name: 'event-list-view', query: { page: page + 1}}" rel="next">Next Page</RouterLink>
  </div>
</template>

<style>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
