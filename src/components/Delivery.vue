<template>
  <div>
    <h1>배송조회</h1><br>
    <form class="d-flex" role="search">  
      <input class="form-control me-2" v-model="searchQuery" placeholder="타이틀을 입력하세요" @input="search"/>
    </form><br>
    <table border="1">
      <tr>
        <th>배송현황</th>
        <th>배송주소</th>
        <th>받는사람</th>
      </tr>
      <tr class="list-group-item" v-for="(post, index) in paginatedPosts" :key="index">
        <td>{{post.delivery_status}}</td>
        <td>{{ post.recipient_address }}</td>
        <td>{{ post.recipient_name }}</td>
      </tr>
    </table>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 0">Previous</button>
      <span>{{ currentPage + 1 }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages - 1">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';

const searchQuery = ref(''); //양방향 검색 담을 그릇
const posts = ref([]); // json 값 담을 그릇
const filteredPosts = ref([]); // 출력 값 담을 그릇
const currentPage = ref(0);

async function fetchData() {
  const res = await fetch(`https://r1-json-server.fly.dev/pack`);
  posts.value = await res.json();
}

const filterPosts = () => {
  if (searchQuery.value) {
    filteredPosts.value = posts.value.filter(post => post.recipient_address.includes(searchQuery.value));
  } else {
    filteredPosts.value = posts.value;
  }
};

onMounted(() => {
  fetchData();
});

watch(searchQuery, filterPosts);

const itemsPerPage = 5;

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / itemsPerPage));

const paginatedPosts = computed(() => {
  const startIndex = currentPage.value * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredPosts.value.slice(startIndex, endIndex);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};
</script>

<style scoped>
  .pagination {
    margin-top: 20px;
    text-align: center;
  }

  .pagination button {
    margin: 0 5px;
  }

  table {
    width: 100%; /* 표의 너비를 100%로 설정 */
    margin-top: 20px; /* 표 상단에 여백 추가 */
    border-collapse: collapse; /* 표 테두리를 합치도록 설정 */
    text-align: center; /* 표 전체를 가운데 정렬 */
  }

  th, td {
    padding: 10px; /* 표 셀에 여백 추가 */
    border: 1px solid #dddddd; /* 표 셀에 테두리 추가 */
    text-align: center; /* 표 셀의 내용을 가운데 정렬 */
  }

  th:nth-child(1) {
    font-size: 20px; /* 첫 번째 열(배송현황)의 글자 크기를 키움 */
  }

  th:nth-child(2) {
    font-size: 20px; /* 두 번째 열(배송주소)의 글자 크기를 키움 */
  }

  th:nth-child(3) {
    font-size: 20px; /* 세 번째 열(받는사람)의 글자 크기를 키움 */
  }

  td {
    font-size: 18px; /* 나머지 열의 글자 크기를 조절 */
  }

</style>
