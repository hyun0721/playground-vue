<!--
 * 컴포넌트 간 통신(반응형) 예제
 *
 * 1) props (ref, reactive)
 * - ref : 양방향 바인딩이 가능하나, 자식 컴포넌트의 수정사항이 반영되지 않음.
 * - reactive : 양방향 바인딩이 가능하며, 자식 컴포넌트의 수정사항이 반영됨.
 *
 * 2) provie, inject
 *
 * 3) toRef
 *
 * 4) EventBus
 *
 * 5) computed
 */
-->
<template>
  <section>
    <h1># 컴포넌트 간 통신(반응형) 예제 실습</h1>
  </section>
  <section>
    <div class="parents-content">
      <h2>Parents</h2>
      <div>
        <span>Input : </span>
        <input type="text" v-model="originData.value" />
      </div>
      <div>
        <FirstChildren :originData="originData"></FirstChildren>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import FirstChildren from '@/components/FirstChildren.vue'
import { provide, readonly, ref } from 'vue'
import { DRILLED_DATA } from '@/symbol/key';

const originData = ref('ttt');    // 반응형 객체

// provide(myInput, originData);

// provide(myInput, reaonly(originData));

provide(DRILLED_DATA, {
  myData: readonly(originData),   // 읽기 전용 속성으로 제공 (inject 컴포넌트에서 변경 불가능)
  updateOriginData(newValue: any) {   // 업데이트 함수 제공
    originData.value = newValue;
  }
});

</script>

<style scoped>
.parents-content {
  margin: 20px;
  padding: 20px;
  border: 1px solid #f45f5f;
  border-radius: 10px;
  background-color: #ecc6c6;
  color: black;
}
</style>
