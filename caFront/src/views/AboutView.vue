<template>
    <article id="calendar">
        <header class="title">
            <div class="current-date">
                <div class="current-day">
                    {{ weekdayNames[currentDay] }}
                </div>
                <div class="today">
                    <div>
                        <div class="arrow-up" @click="dateUp()"></div>
                    </div>
                    <div>
                        <div class="arrow-up" @click="monthUp()"></div>
                    </div>
                    <div>
                        <div class="arrow-up" @click="currentDate.year += 1"></div>
                    </div>
                    <div>{{ currentDate.date }}</div>
                    <div>{{ month[currentDate.month] }}</div>
                    <div>{{ currentDate.year }}</div>
                    <div>
                        <div class="arrow-down" @click="dateDown()"></div>
                    </div>
                    <div>
                        <div class="arrow-down" @click="monthDown()"></div>
                    </div>
                    <div>
                        <div class="arrow-down" @click="currentDate.year -= 1"></div>
                    </div>
                </div>
            </div>
        </header>
        <section>
            <div class="weekdays">
                <div class="weekday" v-for="(weekday, index) in weekdays" :key="index">
                    {{ weekday }}
                </div>
            </div>
            <div class="date">
                <div class="day-hidden" v-for="(n, index) in (firstMonthDay - 1)" :key="'prev' + index">
                    {{ (prevMonthDays + 1) - firstMonthDay + n }}
                </div>
                <div class="day" :class="{ active: n === currentDate.date }" @click="currentDate.date = n"
                    v-for="(n, index) in currentMonthDays" :key="'day' + index">
                    {{ n }}
                </div>
                <div class="day-hidden" v-for="(n, index) in (43 - (currentMonthDays + firstMonthDay))"
                    :key="'next' + index">
                    {{ n }}
                </div>
            </div>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Calendar',
    data: function () {
        return {
            weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
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

<style scoped>
#calendar {
     width: 460px;
     height: 730px;
     background-color: #efefef;
     font-family: 'Anton';
     border-radius: 15px;
     overflow: hidden;
     background-size: cover;
     user-select: none;
}
     .title {
         display: flex;
         justify-content: center;
         align-items: top;
         height: 400px;
         padding: 20px 0 0;
         text-align: center;
         overflow: hidden;
         color: #efefef;
     }

         .current-date {
             width: 300px;
         }

         .arrow-up {

             border-bottom: 10px solid #fff;

         }
                  .arrow-up:hover {
                      border-bottom: 10px solid rgba(0, 0, 0, .4);
                  }

         .arrow-down {
             border-top: 10px solid #fff;

      
         }  .arrow-down.hover {
                 border-top: 10px solid rgba(0, 0, 0, .4);
             }

         .today {
             display: grid;
             grid-template-columns: 40px auto 70px;
             grid-gap: 0;
         }

         .current-day {
             font-size: 4rem;
         }

         .today {
             font-size: 2rem;
         }
     
</style>