<template>
  <div class="grandchild-content">
    <div>
      <h2>Grand Child</h2>
    </div>
    <section class="container">
      <div class="item">
        <span>1) Origin Data: </span>
        <div>{{ myData }}</div>
      </div>
      <div class="item">
        <span>2) My Data: </span>
        <input type="text" v-model="myData" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { DRILLED_DATA, type DataType } from '@/symbol/key';

const { myData } = inject<DataType>(DRILLED_DATA, {
  myData: ref("initial Value"),
  updateOriginData: (newValue: any) => {
    console.log('updateOriginData : ', newValue);
  }
});   // Get 'originData' : 반응성이 유지됨.

onMounted(() => {
  console.log('GrandChild : ', myData.value);
});

</script>

<style scoped>
.grandchild-content {
  margin: 20px;
  padding: 20px;
  border: 1px solid #0ed62c;
  border-radius: 10px;
  background-color: #bcf590;
  color: black;
}

.container {
  height: 100px;
}

.item {
  display: flex;

  > span {
    width: 110px;
  }
}
</style>
