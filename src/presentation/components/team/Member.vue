<template>
  <li class="member">
    <div class="member-name">
      {{ teamMember.user.name || teamMember.user.email }}
    </div>
    <select>
      <option
        v-for="(role, index) in stringRoles"
        :key="index"
        :selected="teamMember.role == index"
      >
        {{ role }}
      </option>
    </select>
    <!-- <div v-if="teamMember.id != 1">
      <Checkbox
        :checked="teamMember.role === 1"
        :label="t('noteSettings.team.canEdit')"
        @update:checked="changeMemberRole"
      />
    </div> -->
  </li>
</template>

<script setup lang="ts">
import Checkbox from '@/presentation/components/checkbox/Checkbox.vue';
import { MemberRole, TeamMember } from '@/domain/entities/Team.ts';
import { useI18n } from 'vue-i18n';
import useNoteSettings from '@/application/services/useNoteSettings';
import { NoteId } from '@/domain/entities/Note';
import { computed } from 'vue';

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

const { changeRole } = useNoteSettings();

/**
 * Change member role
 */
async function changeMemberRole() {
  changeRole(props.id, props.teamMember.user.id, props.teamMember.role);
}

const { t } = useI18n();

const stringRoles = computed(() => Object.values(MemberRole).filter((value) => typeof value === 'string'));
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
