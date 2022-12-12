<template>
  <div class="container">
    <div class="calendar">



        <div class="current-weekday">
          {{ weekdayNames[currentDay] }}
        </div>

        <div class="current-date">


          <div class="day">


            <div class="font">
              <div class="triangle-up" @click="dateDown()"></div>

              {{ currentDate.date }}



              <div class="triangle-down" @click="dateUp()"></div>
            </div>

          </div>
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


          <div class="day-hidden" v-for="(n, index) in (firstMonthDay - 1)" :key="'prev' + index">
            {{ (prevMonthDays + 1) - firstMonthDay + n }}
          </div>
          <div class="day" :class="{ active: n === currentDate.date }" @click="currentDate.date = n"
            v-for="(n, index) in currentMonthDays" :key="'day' + index">
            {{ n }}
          </div>

        </div>

   

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data: function () {
    return {
      weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      weekdayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      month: [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
      ],
      currentDate: {
        date: 0,
        month: 0,
        year: 0
      }
    }
  },
  computed: {
    prevMonthDays() {
      let year = this.currentDate.month === 0 ? this.currentDate.year - 1 : this.currentDate.year;
      let month = this.currentDate.month === 0 ? 12 : this.currentDate.month;
      return new Date(year, month, 0).getDate();
    },
    firstMonthDay() {
      let firstDay = new Date(this.currentDate.year, this.currentDate.month, 1).getDay();
      if (firstDay === 0) firstDay = 7;
      return firstDay;
    },
    currentDay() {
      return new Date(this.currentDate.year, this.currentDate.month, this.currentDate.date).getDay();
    },
    currentMonthDays() {
      return new Date(this.currentDate.year, this.currentDate.month + 1, 0).getDate();
    }
  },
  methods: {
    getCurrentDate() {
      let today = new Date();
      this.currentDate.date = today.getDate();
      this.currentDate.month = today.getMonth();
      this.currentDate.year = today.getFullYear();
    },
    dateUp() {
      if (this.currentDate.date === this.currentMonthDays) {
        this.currentDate.date = 1;
        this.monthUp();
      }
      else {
        this.currentDate.date += 1;
      }
    },
    dateDown() {
      if (this.currentDate.date === 1) {
        this.currentDate.date = this.prevMonthDays;
        this.monthDown();
      }
      else {
        this.currentDate.date -= 1;
      }
    },
    monthUp() {
      if (this.currentDate.month === 11) {
        this.currentDate.month = 0;
        this.currentDate.year += 1;
      }
      else {
        this.currentDate.month += 1;
      }
    },
    monthDown() {
      if (this.currentDate.month === 0) {
        this.currentDate.month = 11;
        this.currentDate.year -= 1;
      }
      else {
        this.currentDate.month -= 1;
      }
    }
  },
  created() {
    this.getCurrentDate();
  }
})
</script>

<style>
a {
  text-decoration: none;
}

body,
html {
  height: 100%;
}

body {
  background: #dfebed;
  font-family: 'Roboto', sans-serif;
}



.calendar {
  background: #2b4450;
  border-radius: 4px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, .3);
  perspective: 1000;
  transition: .9s;
  transform-style: preserve-3d;
  height: 60rem;
  width: 100rem;
}


.current-date {
  font-size: 3rem;
  border-bottom: 1px solid rgba(73, 114, 133, .6);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 12rem;
  position: static;
}









.current-month {
  font-size: 3rem;
}

.font {
  font-size: 4rem;
  position: static;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.current-weekday {
  color: white;
  font-size: 5rem;
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
}

.weekday {
  font-size: 6rem;
}

.weekday,
.day-hidden,
.day {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
}

.day-hidden {
  opacity: 0.5;
}
</style>