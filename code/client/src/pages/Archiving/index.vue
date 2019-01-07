<template>
    <div id="archiving" class="archiving-wrapper">
        <TimeLine :list="list"></TimeLine>
    </div>
</template>
<script>
    import TimeLine from 'components/TimeLine'
    import Archiving from '@/api/archiving'
    export default {
        name: 'Archiving',
        components: {
            TimeLine
        },
        data() {
            return {
                list: []
            }
        },
        mounted () {
            document.getElementById('archiving').scrollIntoView({
                block: 'start',
                behavior: 'smooth' 
            })
            this.getArchiving()
        },
        methods: {
            getArchiving () {
                return new Promise(async resolve => {
                    const res = await Archiving.getArchiving()
                    this.list = this.formatArchiving(res.data)
                })
            },
            formatArchiving (data) {
                let list = []
                data.forEach(({createTime, title, id, type}) => {
                    let d = new Date(createTime),
                        year = d.getFullYear(), 
                        month = `${year}-${d.getMonth()+1}`, 
                        day = d.getDate()

                    const yearObj = list.find(item => item.year === year)
                    // 年份相同
                    if (!yearObj) {
                        list.push({
                            year,
                            months: [
                                {
                                    month,
                                    days: [
                                        { day, title, id, type }
                                    ]
                                }
                            ]
                        })
                    }else {
                        const monthObj = yearObj.months.find(item => item.month === month)
                        // 月份相同
                        if (!monthObj) {
                            yearObj.months.push({
                                month,
                                days: [
                                    { day, title, id, type }
                                ]
                            })
                        }else{
                            monthObj.days.push({ day, title, id, type })
                        }
                    }
                })
                return list
            }
        }
    }
</script>