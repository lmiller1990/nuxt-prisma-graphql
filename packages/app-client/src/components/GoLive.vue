<script lang="ts" setup>
import { gql } from "@urql/core";
import { computed, reactive, ref, watchEffect } from "vue";
import Input, { InputValidationResult } from "./Input.vue";
import { GoLiveFragment, UpdateUserDocument } from "../generated/graphql";
import Textarea from "./Textarea.vue";
import FixedBottom from "./FixedBottom.vue";
import Button from "./Button.vue";
import { useMutation } from "@urql/vue";
import { useSaving } from "../composables/useSaving";

gql`
  mutation UpdateUser($username: String!, $profile: String!) {
    updateUser(username: $username, profile: $profile) {
      username
      profile
    }
  }
`;

gql`
  fragment GoLive on Query {
    viewer {
      username
      profile
    }
  }
`;

const props = defineProps<{
  gql: GoLiveFragment;
}>();

const user = reactive({
  profile: props.gql.viewer?.profile || "",
  username: props.gql.viewer?.username || "",
});

const usernameValidation = computed<InputValidationResult>(() => {
  if (user.username.length) {
    return {
      valid: true,
    };
  }

  return {
    valid: false,
    reason: "Username is required",
  };
});

const updateUser = useMutation(UpdateUserDocument);

const { saving, execute: handleGoLive } = useSaving({
  handle: async () => {
    await updateUser.executeMutation({
      username: user.username,
      profile: user.profile,
    })
  },
})

watchEffect(() => {});
</script>

<template>
  <Input
    :modelValue="user.username"
    @update:modelValue="(val) => (user.username = val)"
    id="username"
    label="Username"
    :validity="usernameValidation"
    :required="true"
  />

  <Textarea
    :modelValue="user.profile"
    @update:modelValue="(val) => (user.profile = val)"
    id="profile"
    label="Profile"
  />

  <FixedBottom>
    <Button
      :disabled="!usernameValidation.valid"
      @click="handleGoLive"
      :loading="saving"
      bg="purple"
    >
      Deploy
    </Button>
  </FixedBottom>
</template>
