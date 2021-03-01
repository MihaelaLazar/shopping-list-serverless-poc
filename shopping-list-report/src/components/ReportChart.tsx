import React from "react";
import {connect} from "react-redux";
import {ApplicationState} from "../store";
import {VictoryAxis, VictoryChart, VictoryLine, VictoryZoomContainer} from "victory";
import {getShoppingItemsReport} from "../store/shopping-list-report/actions";
import {ShoppingListReport, ShoppingListReportState} from "../store/shopping-list-report/types";


class ReportChart extends React.Component<ReportChartProps, ReportChartState> {

    constructor(props: Readonly<ReportChartProps> | ReportChartProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getShoppingItemsReport();
    }

    handleZoom(domain: any) {
        this.setState({selectedDomain: domain});
    }

    handleBrush(domain: any) {
        this.setState({zoomDomain: domain});
    }

    groupReportResultsPerDay(): ShoppingListReport[] {
        const map = new Map<string, ShoppingListReport>();
        this.props.shoppingListReport.data.forEach((item) => {
            let dataPerDay = map.get(new Date(item.id).toLocaleDateString());
            if (!dataPerDay) {
                map.set(new Date(item.id).toLocaleDateString(), item);
            } else {
                dataPerDay.itemsUpdated = dataPerDay.itemsUpdated + item.itemsUpdated;
                dataPerDay.itemsCreated = dataPerDay.itemsCreated + item.itemsCreated;
                dataPerDay.itemsDeleted = dataPerDay.itemsDeleted + item.itemsDeleted;
            }
        });

        console.log(map);
        let array: ShoppingListReport[] = [];
        map.forEach((value, key, map) => {
            array.push(value);
        })
        return array;
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                <VictoryChart

                    width={550}
                    height={300}
                    scale={{x: "time"}}
                    minDomain={{y: 0}}
                    containerComponent={
                        <VictoryZoomContainer responsive={true}
                                              zoomDimension="x"
                                              zoomDomain={this.state.zoomDomain}
                                              onZoomDomainChange={this.handleZoom.bind(this)}
                        />
                    }
                >
                    <VictoryAxis dependentAxis
                                 offsetX={225}
                    />
                    <VictoryLine
                        style={{
                            data: {stroke: "tomato"}
                        }}
                        data={this.groupReportResultsPerDay().map((item, index) => {
                            return {
                                x: new Date(item.id).toLocaleDateString(),
                                y: item.itemsCreated
                            }
                        })}
                    />

                </VictoryChart>
            </div>

        );
    }
}

interface ReportChartProps {
    shoppingListReport: ShoppingListReportState,
    getShoppingItemsReport: () => void;

}

interface ReportChartState {
    zoomDomain?: any;
    selectedDomain?: any;
}

const mapStateToProps = (state: ApplicationState) => ({
    shoppingListReport: state.shoppingListReport,
});

const mapDispatchToProps = {
    getShoppingItemsReport
};


export default connect(mapStateToProps, mapDispatchToProps)(ReportChart);