<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { botttsNeutral, initials } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'

const props = defineProps<{
  seed: string
  class?: HTMLAttributes['class']
  variant: 'botttsNeutral' | 'initials'
}>()

const avatar = props.variant === 'botttsNeutral'
  ? createAvatar(botttsNeutral, { seed: props.seed })
  : createAvatar(initials, { seed: props.seed, fontWeight: 500, fontSize: 42 })
</script>

<template>
  <Avatar :class="cn(props.class)">
    <AvatarImage :src="avatar.toDataUri()" alt="Avatar" />
    <AvatarFallback>
      {{ props.seed.charAt(0).toUpperCase() }}
    </AvatarFallback>
  </Avatar>
</template>
