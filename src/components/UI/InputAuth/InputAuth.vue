<template>
  <div class="InputAuth">
    <input
      class="InputAuth__Input"

      :type="typeInput"
      @input="handleInput"
      :placeholder="placeholder"
      :value="valueIn"
      v-bind="$attrs"
    />
    <div v-if="type === 'password'" class="InputAuth__BackSide">
      <NoEye class="InputAuth__eye" v-if="typeInput === 'password'" @click="changeType"/>
      <Eye class="InputAuth__eye" v-if="typeInput === 'text'" @click="changeType"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import NoEye from '@/assets/icons/NoEye.svg?component';
import Eye from '@/assets/icons/Eye.svg?component';

const props = defineProps({
  valueIn: {
    type: String,
    required: true
  },
  type: {
    type: String as PropType<'text' | 'password'>,
    default: 'text',
    required: false
  },
  placeholder: {
    type: String,
    default: '',
  },
});

const typeInput = ref(props.type);

const emit = defineEmits(['update:value']);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:value', target.value);
};

const changeType = () => {
  typeInput.value = typeInput.value === 'password'? 'text': 'password';
}

</script>

<style scoped lang="scss">
.InputAuth {
  position: relative;

  width: clamp(200px, 60%, 400px);
  padding: 0.5em;
  font-size: 1em;
  border: 3px solid var(--BaseColor);
  border-radius: 4px;

  &__Input{
    width: 100%;
    &::placeholder{
      color: var(--BaseColor);
    }
  }

  &__eye{
    fill: var(--BaseColor);
    cursor: pointer;
  }
  &__BackSide{
    position: absolute;
    right: 4px;
    top: 10%;
    width: 30px;
    height: 30px;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: all .3s;

    &:hover{
      background-color: var(--GrayOp);
    }
  }
}
</style>