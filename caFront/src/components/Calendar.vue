<template>
  <div class="container">
    <div class="calendar">
      <div class="current-weekday">
        <span class="text">{{ weekdayNames[currentDay] }}</span>
        <span class="text">
          {{ currentDate.month + 1 }}/{{ currentDate.date }}/{{
            currentDate.year
          }}
        </span>
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
          @click="currentDate.date = day"
          v-for="day in currentMonthDays"
          :key="day"
          :class="{
            color: isMeetingDate(day),
          }"
        >
          {{ day }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserDataStore } from "../stores/userData";
import { defineComponent } from "vue";
import { useClubActivity } from "../stores/clubActivity";
import miniButton from "../components/miniButton.vue";
interface MeetingDate {
  date: string;
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
      type: Array<MeetingDate>,
      required: true,
    },
  },
  setup(props) {
    const meetingDates = props.meetingDates;
    const objectData = useUserDataStore();
    const clubActivity = useClubActivity();

    return { clubActivity, meetingDates, objectData };
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
    isMeetingDate(day: number) {
      return this.meetingDates.some(
        (date) =>
          date.date ===
          `${this.currentDate.month + 1}/${day}/${this.currentDate.year}`
      );
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
  justify-content: space-around;
  height: 15rem;
  position: relative;
}
.current-month {
  font-size: 3rem;
}

.color {
  background-color: red;
}
.font {
  font-size: 4rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.current-weekday {
  margin-top: 2rem;
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
    color: white;
    column-gap: 2rem;
    row-gap: 2rem;
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
    color: white;
    column-gap: 1rem;
    row-gap: 2rem;
  }
}
</style>
