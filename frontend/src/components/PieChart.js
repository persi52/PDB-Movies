import React from 'react'
import { Pie } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { getUserSeenGenres } from '../routes/movieRoutes'
import { getCurrentUser } from '../routes/userRoutes'

class PieChart extends React.Component {

    state={
        
        names: [],
        per:[],
    }
    
    constructor(props){
        super(props);
        this.getStats(props.user_id);
        console.log(props.user_id)
    }

        getStats(user_id){
            let id = user_id;
            if(id===0){
                getCurrentUser().then(resp=>{
                    id=resp.user_id;
                    let n = new Array;
                    let p = new Array;
            return(getUserSeenGenres(id).then(async resp=>{
                for(const element of resp) {
                    n.push(element.name);
                    p.push(element.amount);
                };
                
                this.setState({names:n, per:p})          
            }))
                })
            }else{
            let n = new Array;
            let p = new Array;
            return(getUserSeenGenres(id).then(async resp=>{
                for(const element of resp) {
                    n.push(element.name);
                    p.push(element.amount);
                };
                
                this.setState({names:n, per:p})          
            }))}  
        };

    render() {
        if(this.state.names.length===0){return(<div>Zbyt mało danych, aby stworzyć wykres.</div>)}
        return(
        <div>
            <Pie
            data={{
                labels: this.state.names,
                datasets: [
                    {
                        data: this.state.per,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.4)',
                            'rgba(54, 162, 235, 0.4)',
                            'rgba(255, 206, 86, 0.4)',
                            'rgba(75, 192, 192, 0.4)',
                            'rgba(153, 102, 255, 0.4)',
                            'rgba(255, 159, 64, 0.4)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1,


                    }
                ]
                
        }}  

        plugins={[ChartDataLabels]}

        options= {{
            maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    datalabels: {
                        color: 'rgba(255,255,255,0.6',
                        formatter: (value, context) => {
                            return context.chart.data.labels[context.dataIndex];
                        },
                        font: {
                            size: 13,
                            family: 'Poppins',
                        },
                        
                    },
                    labels: {

                        
                    }
                },
            }}
        

        height={320}
        width={320}

        >
            
        </Pie>
            
        </div>
        )}
}

export default PieChart;