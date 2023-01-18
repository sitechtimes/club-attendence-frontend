<template>
  <div class="container">
    <div class="calendar">
      <div class="current-weekday">
        <span>{{ weekdayNames[currentDay] }}</span>
        <span>
          {{ currentDate.month + 1}}/{{ currentDate.date }}/{{
            currentDate.year
          }}
        </span>
        <Button @click="clubActivity.closeModal()">Close></Button>
      </div>

      <div class="current-date">
        <div class="month">
          <div class="font">
            <div class="triangle-up" @click="monthDown()"></div>

            {{ month[currentDate.month] }}

            <div class="triangle-down" @click="monthUp()"></div>
          </div>
        </div>

        <div class="year">
          <div class="font">
            <div class="triangle-up" @click="currentDate.year -= 1"></div>
            {{ currentDate.year }}
            <div class="triangle-down" @click="currentDate.year += 1"></div>
          </div>
        </div>
      </div>
      <div class="showcalendar">
        <div class="weekday" v-for="(weekday, index) in weekdays" :key="index">
          <span>{{ weekday }} </span>
        </div>

        <div
          class="day-hidden"
          v-for="(n, index) in firstMonthDay - 1"
          :key="'prev' + index"
        >
          {{ prevMonthDays + 1 - firstMonthDay + n }}
        </div>
        <div
          class="day"
          :class="{ active: n === currentDate.date }"
          @click="currentDate.date = n"
          v-for="(n, index) in currentMonthDays"
          :key="'day' + index"
        >
          {{ n }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useClubActivity } from "../stores/clubActivity";
import Button from "../components/Button.vue";
export default defineComponent({
  name: "Calendar",
  components: {
    Button,
  },
  data: function () {
    return {
      weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      weekdayNames: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      month: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      currentDate: {
        date: 0,
        month: 1,
        year: 0,
      },
    };
  },
  setup() {
    const clubActivity = useClubActivity();

    return { clubActivity };
  },
  computed: {
    prevMonthDays() {
      let year =
        this.currentDate.month === 0
          ? this.currentDate.year - 1
          : this.currentDate.year;
      let month = this.currentDate.month === 0 ? 12 : this.currentDate.month;
      return new Date(year, month, 0).getDate();
    },
    firstMonthDay() {
      let firstDay = new Date(
        this.currentDate.year,
        this.currentDate.month,
        1
      ).getDay();
      if (firstDay === 0) firstDay = 7;
      return firstDay;
    },
    currentDay() {
      return new Date(
        this.currentDate.year,
        this.currentDate.month,
        this.currentDate.date
      ).getDay();
    },
    currentMonthDays() {
      return new Date(
        this.currentDate.year,
        this.currentDate.month + 1,
        0
      ).getDate();
    },
  },
  methods: {
    getCurrentDate() {
      let today = new Date();
      this.currentDate.date = today.getDate();
      this.currentDate.month = today.getMonth();
      this.currentDate.year = today.getFullYear();
    },
    monthUp() {
      if (this.currentDate.month === 11) {
        this.currentDate.month = 0;
        this.currentDate.year += 1;
      } else {
        this.currentDate.month += 1;
      }
    },
    monthDown() {
      if (this.currentDate.month === 0) {
        this.currentDate.month = 11;
        this.currentDate.year -= 1;
      } else {
        this.currentDate.month -= 1;
      }
    },
  },
  created() {
    this.getCurrentDate();
  },
});
</script>

<style>
.current-date {
  font-size: 3rem;
  border-bottom: 1px solid rgba(73, 114, 133, 0.6);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 15rem;
}
.current-month {
  font-size: 3rem;
}

.font {
  font-size: 4rem;

  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.current-weekday {
  color: white;
  font-size: 5rem;
  position: static;
}

.triangle-up {
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  border-bottom: 2rem solid white;
  height: 1rem;
  width: 1rem;
}

.triangle-down {
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  border-top: 2rem solid white;
  height: 1rem;
  width: 1rem;
  align-items: center;
}

.showcalendar {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  font-size: 4rem;
  color: white;
  column-gap: 5rem;
  row-gap: 2rem;
  position: static;
}

.weekday {
  font-size: 6rem;
}

.weekday,
.day-hidden,
.day {
  display: flex;
  justify-content: center;
}

.day-hidden {
  opacity: 0.5;
}
.month {
  position: fixed;
  font-size: 4rem;
}
.current-weekday {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  font-size: 8rem;
}

.current-date {
  display: flex;
  flex-direction: row;
}
</style>
