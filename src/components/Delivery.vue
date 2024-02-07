<template>

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
    <tr class="list-group-item" v-for="post in filteredPosts">
        <td>{{post.delivery_status}}</td>
        <td>{{ post.recipient_address }}</td>
        <td>{{ post.recipient_name }}</td>
    </tr>
    </table>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue';
// import axios from 'axios';

const searchQuery = ref(''); //양방향 검색 담을 그릇
const posts = ref([]); // json 값 담을 그릇
const filteredPosts = ref([]); // 출력 값 담을 그릇

async function fetchData() {
    posts.value = null
        const res = await fetch(
                `https://r1-json-server.fly.dev/pack`
                )
        posts.value = await res.json()
}

// const fetchData = async () => {
//   const response = await axios.get(`https://palworld-json-server.fly.dev/posts`);
//   posts.value = response.data;
// };

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
</script>
