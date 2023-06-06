<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <miniButton
          class="position"
          @click="clubsDescription.closeDescription()"
          >x</miniButton
        >
        <div class="container">
          <div class="header">Club Description</div>
          <textarea name="textarea" rows="5" cols="30" class="club-description"
            >{{ description }}
          </textarea>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useClubsDescription } from "@/stores/ClubDescription";
import { useUserDataStore } from "@/stores/userData";
import miniButton from "../components/miniButton.vue";
export default defineComponent({
  name: "ClubDescription",
  components: { miniButton },
  props: {},
  setup() {
    const clubsDescription = useClubsDescription();
    const userDataStore = useUserDataStore();

    const description = ref<string>("");

    onMounted(() => {
      userDataStore.user?.clubData.forEach((club) => {
        if (club.clubName === clubsDescription.clubName) {
          description.value = club.clubDescription;
        }
      });
    });

    return {
      clubsDescription,
      userDataStore,
      description,
    };
  },
});
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
.modal {
  background: #ffffff;
  overflow-x: auto;
  width: 60rem;
  height: 60rem;
  border-radius: 1rem;
}
.position {
  position: fixed;
  top: 3rem;
  right: 3rem;
}
.container {
  margin: 3rem;
}
.club-description {
  font-size: 2rem;
}
.header {
  font-size: 4rem;
}

@media (max-width: 675px) {
  .modal {
    background: #ffffff;
    overflow-x: auto;
    width: 40rem;
    height: 40rem;
    border-radius: 1rem;
  }
}

@media (max-width: 500px) {
  .modal {
    background: #ffffff;
    overflow-x: auto;
    width: 35rem;
    height: 40rem;
    border-radius: 1rem;
  }
}
</style>
