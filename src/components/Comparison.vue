<template>
  <div class="table-container">
    <h2>날짜 별 판매 수량</h2><br>
    <table style="border:1px">
      <!-- 날짜를 기준으로 항목들을 그룹화하여 순회 -->
      <div v-for="(group, date) in sortedGroupedPosts" :key="date">
        <h3>{{ date }}</h3><br>
        <!-- 각 그룹에 속한 항목들을 출력 -->
        <ul class="scrollable-list">
          <li class="list-group-db">
            전체 수량 : {{ getTotalItems(group) }}<br><br>
          </li>
          <li class="list-group-db" v-for="item in group" :key="item.id">
            제품명 : {{ item.Item }}<br> 수  량 : {{ item.SalesQuantity }}
          </li>
        </ul>
      </div>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';

const searchQuery = ref('') //양방향 검색 담을 그릇
// json 값 담을 그릇
const postsDb = ref([])
const postsGraph = ref([])
//const filteredPosts = ref([]); // 출력 값 담을 그릇

async function fetchData() {
  postsDb.value = null
  postsGraph.value = null
  const resDb = await fetch(`https://r1-json-server.fly.dev/db`)
  const resGraph = await fetch(`https://r1-json-server.fly.dev/graph`)
  postsDb.value = await resDb.json()
  postsGraph.value = await resGraph.json()
}

onMounted(() => {
  fetchData();
})
// 날짜별 항목 그룹화하여 총 개수 반환
const getTotalItems = (group) => {
  return group.reduce((total, item) => total + item.SalesQuantity, 0);
};

const groupedPosts = computed(() => {
if (!postsDb.value) return {};
  const grouped = {};
  // 항목들을 날짜(date) 기준으로 그룹화
  for (const item of postsDb.value) {
    const date = item.TransactionDate.split('T')[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  }
  return grouped;
});

const sortedGroupedPosts = computed(() => {
  const sortedGrouped = {};
  Object.keys(groupedPosts.value)
    .sort()
    .forEach((date) => {
      sortedGrouped[date] = groupedPosts.value[date];
    });
  return sortedGrouped;
});
</script>

<style scoped>
.table-container {
  max-height: 600px; /* 테이블의 최대 높이를 설정하세요 */
  overflow-y: auto;
}
.list-group-db {
  margin-bottom: 10px;
}
</style>