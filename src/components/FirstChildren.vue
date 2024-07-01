<template>
  <div class="child-content">
    <h2>Child</h2>
    <section class="container">
      <div class="item">
        <span>1) Origin Data : </span>
        <div>{{ myData }}</div>
      </div>
      <div class="item">
        <span>2) My Data : </span>
        <input type="text" v-model="myData" />
        <button @click="updateOriginData('clicked input...')">update</button>
      </div>
    </section>
    <div>
      <GrandChild></GrandChild>
    </div>
  </div>
</template>

<script setup lang="ts">
import GrandChild from '@/components/GrandChild.vue'
import { inject, onMounted } from 'vue'
import { DRILLED_DATA, type DataType } from '@/symbol/key';

// const myData:any = inject(DRILLED_DATA);   // Get 'originData' : 반응성이 유지됨.
const { myData, updateOriginData } = inject<DataType>(DRILLED_DATA)!;   // Get 'originData' : 반응성이 유지됨.

onMounted(() => {
  console.log('Child : ', myData.value);
  updateOriginData('test');
});

</script>

<style scoped>
.child-content {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ec7741;
  border-radius: 10px;
  background-color: #f3d1bd;
  color: black;
}

.container {
  height: 70px;
}

.item {
  display: flex;

  > span {
    width: 110px;
  }
}
</style>
