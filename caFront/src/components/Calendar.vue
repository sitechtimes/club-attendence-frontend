<template>
  <div class="calendar_container">
    <div class="calendar">
      <div class="current-weekday">
        <span class="text">{{ weekdayNames[currentDay] }}</span>
        <span class="text">
          {{ currentDate.month + 1 }}/{{ currentDate.date }}/{{
            currentDate.year
          }}
        </span>
        <ul class="nextdates" v-for="date in meetingDates" :key="date">
          <h2>
            {{ date }}
          </h2>
        </ul>

        <miniButton class="static" @click="clubActivity.closeModal()">
          x
        </miniButton>
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
        <div class="weekday" v-for="weekday in weekdays" :key="weekday">
          <span>{{ weekday }} </span>
        </div>

        <div class="day-hidden" v-for="day in firstMonthDay - 1" :key="day">
          {{ prevMonthDays + 1 - firstMonthDay + day }}
        </div>
        <div
          class="day"
          v-for="day in currentMonthDays"
          @click="verifyDate(currentDate, day)"
          :class="{
            active: checkDate(allDates, day),
          }"
          :key="day"
        >
          {{ day }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserDataStore } from "../stores/userData";
import { defineComponent, onMounted } from "vue";
import { useClubActivity } from "../stores/clubActivity";
import miniButton from "../components/miniButton.vue";

interface CalendarType {
  date: number;
  month: number;
  year: number;
}
export default defineComponent({
  name: "Calendar",
  components: {
    miniButton,
  },
  data() {
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
  props: {
    meetingDates: {
      type: Array<string>,
      required: false,
    },
  },
  setup() {
    const objectData = useUserDataStore();
    const user = objectData.user;
    const clubData = user!.clubData;
    const allDates: Array<string> = [];
    onMounted(() =>
      clubData.forEach((element: any) => {
        for (let i = 0; element.meetingDates.length > i; i++) {
          console.log(element.meetingDates[i]);
          allDates.push(element.meetingDates[i]);
        }
        console.log(allDates);
      })
    );

    const clubActivity = useClubActivity();
    const currentDate: CalendarType[] = [{ date: 0, month: 1, year: 0 }];

    function checkDate(allDates: any, day: any) {
      allDates.forEach((element: any, currentDate: any) => {
        if (element === `${currentDate.month + 1}/${day}/${currentDate.year}`)
          return true;
      });
    }

    return {
      clubActivity,
      clubData,
      allDates,
      objectData,
      currentDate,
      checkDate,
    };
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
    showMdate(currentDate: any, day: any) {
      console.log(`${currentDate.month + 1}/${day}/${currentDate.year}`);
    },
    verifyDate(allDates: any, day: any) {
      allDates.forEach((element: any) => {
        if (
          element ===
          `${this.currentDate.month + 1}/${day}/${this.currentDate.year}`
        )
          console.log(element);
      });
    },

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

<style scoped>
.current-date {
  font-size: 3rem;
  border-bottom: 1px solid rgba(73, 114, 133, 0.6);
  display: flex;
  justify-content: space-around;
  height: 15rem;
  position: relative;
}
.current-month {
  font-size: 3rem;
}

.active {
  background-color: red;
}
.font {
  font-size: 4rem;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.current-weekday {
  margin-top: 2rem;

  font-size: 5rem;
  position: static;
}

.triangle-up {
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  border-bottom: 2rem solid;
  height: 1rem;
  width: 1rem;
}

.triangle-down {
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  border-top: 2rem solid;
  height: 1rem;
  width: 1rem;
  align-items: center;
}

.showcalendar {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  font-size: 4rem;

  column-gap: 5rem;
  row-gap: 2rem;
}

.weekday {
  font-size: 6rem;
}

.weekday,
.day-hidden,
.day {
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.day-hidden {
  opacity: 0.5;
}

.current-weekday {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  font-size: 8rem;
}
.static {
  position: fixed;
  top: 2rem;
  right: 2rem;
}
.month,
.year,
.text {
  max-width: 8rem;
  align-content: center;
}
.text {
  display: flex;
  justify-content: center;
  font-weight: bold;
}

@media (max-width: 1150px) {
  .current-weekday {
    font-size: 5rem;
    display: flex;
    margin-top: 2rem;
    margin-bottom: 2rem;
    justify-content: space-around;
  }
  .showcalendar {
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
    font-size: 2rem;

    column-gap: 2rem;
    row-gap: 2rem;
  }
  .static {
    bottom: -38rem;
  }
  .font {
    font-size: 3rem;
  }
  .current-date {
    height: 11rem;
  }
  .weekday {
    font-size: 3rem;
  }
  .showcalendar {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
    font-size: 3rem;

    column-gap: 1rem;
    row-gap: 2rem;
  }
}
</style>
