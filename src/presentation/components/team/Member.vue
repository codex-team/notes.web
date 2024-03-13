<template>
  <li class="member">
    <div class="member-name">
      {{ teamMember.user.name || teamMember.user.email }}
    </div>
    <select
      v-model="selectedRole"
      @change="updateMemberRole($event)"
    >
      <option
        v-for="(role, index) in roleOptions"
        :key="index"
      >
        {{ role }}
      </option>
    </select>
  </li>
</template>

<script setup lang="ts">
import { MemberRole, TeamMember } from '@/domain/entities/Team.ts';
import { NoteId } from '@/domain/entities/Note';
import { computed, ref } from 'vue';
import useNoteSettings from '@/application/services/useNoteSettings';

/**
 * TeamMember props
 */
const props = defineProps<{
  /**
   * Team member data
   */
  teamMember: TeamMember;
  /**
   * Id of the current note
   */
  id: NoteId;
}>();

const selectedRole = ref(MemberRole[props.teamMember.role]);

const roleOptions = computed(() => Object.values(MemberRole).filter((value) => typeof value === 'string'));

const { changeRole } = useNoteSettings();

/**
 * Updates the user role if it has been changed
 *
 * @param event
 */
async function updateMemberRole(event: Event) {
  changeRole(props.id, props.teamMember.user.id, MemberRole[(event.target as HTMLSelectElement).value as string]);
  console.log((event.target as HTMLSelectElement).value);
}
</script>

<style scoped>
.member {
  margin-top: var(--spacing-l);
}
.member-name {
  display: flex;
  align-items: center;
  gap: var(--spacing-very-x);
}
</style>
