<template> 
  <div>
    <h2>매출 비교 그래프</h2><br>
    <canvas id="myChart" width="400" height="400"></canvas>
  </div>
  <!-- <div>
    <li v-for="item in graphData">
      <p>Date: {{ item.date }}</p>
      <p>Revenue: {{ item.revenue }}</p>
      <p>Sales Quantity: {{ item.sales_quantity }}</p>
    </li>
  </div> -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const graphData = ref([]);

async function fetchData() {
  graphData.value = null;
  const res = await fetch(`https://r1-json-server.fly.dev/graph`);
  const jsonData = await res.json();
  
  // 날짜별 중복 제거
  const uniqueDates = [...new Set(jsonData.map(item => item.date))];
  const aggregatedData = uniqueDates.map(date => {
    const filteredItems = jsonData.filter(item => item.date === date);
    const totalRevenue = filteredItems.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalSalesQuantity = filteredItems.reduce((acc, curr) => acc + curr.sales_quantity, 0);
    return {
      date,
      revenue: totalRevenue,
      sales_quantity: totalSalesQuantity
    };
  });
  
  graphData.value = aggregatedData;
}

onMounted(() => {
  fetchData().then(() => {
    createLineGraph();
  });
});

function createLineGraph() {
  const dates = graphData.value.map(item => item.date);
  const revenues = graphData.value.map(item => item.revenue);

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: '일별 매출 현황',
          data: revenues,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
</script>