<template>
  <div class="table_wrapper">
    <table class="tariff_table">
      <thead>
        <tr>
          <th class="level_col"></th>
          <th v-for="tariff in tariffs" :key="tariff.name">
            <div class="tariff_title">
              <div class="tariff_name">{{ tariff.name }}</div>
              <div class="tariff_sub">{{ tariff.subtitle }}</div>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="level in 10" :key="level">
          <td class="level_col">{{ level }}</td>

          <td
            v-for="tariff in tariffs"
            :key="tariff.name + level"
          >
            {{ tariff.percentages[level] || '' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
    name: "AppTariffTable",

    data() {
        return {
        tariffs: [
            {
            name: "Free тариф",
            subtitle: "Partner",
            percentages: {
                1: "10%"
            }
            },
            {
            name: "Silver",
            subtitle: "1 Бизнес место",
            percentages: {
                1: "10%",
                2: "5%",
                3: "5%"
            }
            },
            {
            name: "Gold",
            subtitle: "2 Бизнес места",
            percentages: {
                1: "10%",
                2: "5%",
                3: "5%",
                4: "3%",
                5: "3%"
            }
            },
            {
            name: "Platinum",
            subtitle: "3 Бизнес места",
            percentages: {
                1: "10%",
                2: "5%",
                3: "5%",
                4: "3%",
                5: "3%",
                6: "2%",
                7: "2%",
                8: "1%",
                9: "1%",
                10: "1%"
            }
            }
        ]
        }
    }
    }
</script>

<style scoped>
    .table_wrapper {
        width: 100%;
        overflow-x: auto;
        background: #011851;
        border-radius: 15px;
    }

    .tariff_table {
        width: 100%;
        border-collapse: collapse;
        color: white;
        min-width: 800px;
    }

    thead th {
        padding: 28px 30px;
        font-size: 18px;
        font-weight: 700;
        border-bottom: 1px solid rgba(255,255,255,0.2);
        border-right: 1px solid rgba(255,255,255,0.15);
    }

    tbody td {
        padding: 4px;
        text-align: center;
        font-size: 18px;
        line-height: 22px;
        border-bottom: 1px solid rgba(255,255,255,0.15);
        border-right: 1px solid rgba(255,255,255,0.1);
        font-family: 'OpenSans';
    }

    .level_col {
        width: 60px;
        text-align: center;
        font-weight: 500;
        opacity: 0.8;
        font-size: 18px;
        font-family: 'OpenSans';
    }

    .tariff_title {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .tariff_name {
        font-size: 18px;
        line-height: 22px;
        font-weight: 700;
        font-family: 'OpenSans';
    }

    .tariff_sub {
        font-size: 18px;
        opacity: 0.8;
        font-family: 'OpenSans';
    }

    tr:last-child td {
        border-bottom: none;
    }

    th:last-child,
    td:last-child {
        border-right: none;
    }
</style>
