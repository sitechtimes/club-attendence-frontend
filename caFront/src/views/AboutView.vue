<template>
    <div class="container">
        <div class="calendar">
            <div class="front">
                
                
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
                <div class="day-hidden" v-for="(n, index) in (43 - (currentMonthDays + firstMonthDay))" :key="'next' + index">
                    {{ n }}
                </div>
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

.container {
    align-items: center;
    display: flex;
    
    justify-content: center;
    margin: 0 auto;
    max-width: 80rem;
   
    
}

.calendar {
    background: #2b4450;
    border-radius: 4px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, .3);
    height: 60rem;
    perspective: 1000;
    transition: .9s;
    transform-style: preserve-3d;
    width: 100%;
}

/* Front - Calendar */
.front {
    transform: rotateY(0deg);
}

.current-date {
    font-size: 3rem;
    border-bottom: 1px solid rgba(73, 114, 133, .6);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
    height: 12rem;
}

.current-date h1 {
    color: #dfebed;
    font-size: 1.4em;
    font-weight: 300;
}

.week-days {
    color: #dfebed;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    padding: 30px 40px;
}

.days {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.weeks {
    color: #fff;
    display: flex;
    flex-direction: column;
    padding: 0 40px;
}

.weeks div {
    display: flex;
    font-size: 1.2em;
    font-weight: 300;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 100%;
}

.last-month {
    opacity: .3;
}

.weeks span {
    padding: 10px;
}

.weeks span.active {
    background: #f78536;
    border-radius: 50%;
}

.weeks span:not(.last-month):hover {
    cursor: pointer;
    font-weight: 600;
}

.event {
    position: relative;
}

.event:after {
    content: '•';
    color: #f78536;
    font-size: 1.4em;
    position: absolute;
    right: -4px;
    top: -4px;
}

/* Back - Event form */

.back {
    height: 100%;
    transform: rotateY(180deg);
}

.back input {
    background: none;
    border: none;
    border-bottom: 1px solid rgba(73, 114, 133, .6);
    color: #dfebed;
    font-size: 1.4em;
    font-weight: 300;
    padding: 30px 40px;
    width: 100%;
}

.info {
    color: #dfebed;
    display: flex;
    flex-direction: column;
    font-weight: 600;
    font-size: 1.2em;
    padding: 30px 40px;
}

.info div:not(.observations) {
    margin-bottom: 40px;
}

.info span {
    font-weight: 300;
}

.info .date {
    display: flex;
    justify-content: space-between;
}

.info .date p {
    width: 50%;
}

.info .address p {
    width: 100%;
}

.actions {
    bottom: 0;
    border-top: 1px solid rgba(73, 114, 133, .6);
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 100%;
}

.actions button {
    background: none;
    border: 0;
    color: #fff;
    font-weight: 600;
    letter-spacing: 3px;
    margin: 0;
    padding: 30px 0;
    text-transform: uppercase;
    width: 50%;
}

.actions button:first-of-type {
    border-right: 1px solid rgba(73, 114, 133, .6);
}

.actions button:hover {
    background: #497285;
    cursor: pointer;
}

.actions button:active {
    background: #5889a0;
    outline: none;
}

/* Flip animation */

.flip {
    transform: rotateY(180deg);
}

.front,
.back {
    backface-visibility: hidden;
}
.arrows-up{
    color: white;
}
.arrows-down {
    background-color: white;
}

.current-month{
    font-size: 3rem;
}
.font{
    font-size: 4rem;
    position: static;
    color: white;
    display: flex;
flex-direction: column;
align-items: center;
}

.current-weekday{
color:white;
font-size: 5rem;
margin: 3rem;
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
.weekdays{
    color: white;
    font-size: 5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
.date{
    color:white;
    font-size: 3rem;
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
   grid-gap: 3rem;
}
</style>