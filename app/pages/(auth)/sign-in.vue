<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { OctagonAlertIcon } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({
  layout: 'auth',
})

const errorMsg = ref<string | null>(null)
const pending = ref(false)

const auth = useAuth()

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  errorMsg.value = null
  pending.value = true
  auth.signIn.email({
    email: values.email,
    password: values.password,
    callbackURL: '/',
  }, {
    onSuccess: () => {
      pending.value = false
    },
    onError: ({ error }) => {
      errorMsg.value = error.message
      pending.value = false
    },
  })
})

function onSocial(provider: 'google' | 'github') {
  errorMsg.value = null
  pending.value = true
  auth.signIn.social({
    provider,
    callbackURL: '/',
  }, {
    onSuccess: () => {
      pending.value = false
    },
    onError: ({ error }) => {
      errorMsg.value = error.message
      pending.value = false
    },
  })
}
</script>

<template>
  <div class="flex flex-col gap-y-6">
    <Card class="p-0 overflow-hidden">
      <CardContent class="grid p-0 md:grid-cols-2">
        <form class="p-6 md:p-8" @submit="onSubmit">
          <div class="flex flex-col gap-y-6">
            <div class="flex flex-col items-center text-center">
              <h1 class="text-2xl font-bold">
                Welcome back!
              </h1>
              <p class="text-mute-foreground text-balance">
                Please sign in to your account
              </p>
            </div>
            <div class="grid gap-3">
              <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="example@email.com" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <Alert v-if="!!errorMsg" class="bg-destructive/10 border-none">
              <OctagonAlertIcon class="size-4 !text-destructive" />
              <AlertTitle>{{ errorMsg }}</AlertTitle>
            </Alert>
            <Button type="submit" class="w-full" :disabled="pending">
              Sign In
            </Button>
            <div class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2  after:left-0 after:z-0 after:flex after:items-center after:border-t">
              <span class="bg-card px-2 text-muted-foreground relative z-10">
                Don't have an account?
              </span>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <Button
                variant="outline" class="w-full" :disabled="pending" @click="() => onSocial('google')"
              >
                <Icon name="mdi:google" class="size-4 mr-2" />
                Google
              </Button>
              <Button
                variant="outline" class="w-full" :disabled="pending" @click="() => onSocial('github')"
              >
                <Icon name="mdi:github" class="size-4 mr-2" />
                Github
              </Button>
            </div>
            <div class="text-center text-sm">
              Don&apos;t have an account?
              <NuxtLink to="/sign-up" class="underline hover:underline-offset-4">
                Sign Up
              </NuxtLink>
            </div>
          </div>
        </form>
        <div class="bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-4 items-center justify-center">
          <img src="/logo.svg" alt="Logo" class="size-[92px]">
          <p class="text-white text-2xl font-semibold">
            Meet.AI
          </p>
        </div>
      </CardContent>
    </Card>
    <div class="text-muted-foreground text-center text-xs text-balance *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4">
      By signing in, you agree to our
      <NuxtLink href="#" class="underline hover:underline-offset-4">
        Terms of Service
      </NuxtLink>
      and
      <NuxtLink href="#" class="underline hover:underline-offset-4">
        Privacy Policy
      </NuxtLink>.
    </div>
  </div>
</template>
