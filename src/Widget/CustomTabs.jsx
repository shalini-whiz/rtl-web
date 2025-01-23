import React from "react";
import PropTypes from "prop-types";
const { Tabs, Tab, Grid } = require("@mui/material");

class CustomTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: [],
            tabValue: 0,
            tabItem: undefined,
            TabComponent: undefined
        };
    }

    async componentDidMount() {
        let tabs = [...this.props.tabList];
        if (tabs.length) {
            let item = tabs[0];
            this.setState({
                tabValue: item.value,
                TabComponent: item.component,
                tabItem: item
            });
        }
        this.setState({ tabList: tabs });
    }

    tabHandleChange = (e, item) => {
        this.setState({
            tabValue: item.value,
            TabComponent: item.component,
            tabItem: item
        });
    };
    render() {
        const { tabList, tabValue, TabComponent, tabItem } = this.state;
        return (
            <main>
                <div>
                    <div style={{ width: "100%" }}>
                        <Grid container spacing={3}>

                            <Grid
                                item
                                md={12}
                                sm={12}
                            >
                                <Tabs
                                    value={tabValue}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                >
                                    {tabList.map((item, index) => {
                                        return (
                                            <Tab
                                                key={index}
                                                label={item.title}
                                                onClick={e =>
                                                    this.tabHandleChange(
                                                        e,
                                                        item
                                                    )
                                                }
                                            />
                                        );
                                    })}
                                </Tabs>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid
                                item
                                md={12}
                                sm={12}
                            >
                                {TabComponent ? (
                                    <TabComponent data={tabItem} />
                                ) : (
                                    "No view"
                                )}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </main>
        );
    }
}
CustomTabs.propTypes = {
    classes: PropTypes.object,
    role: PropTypes.string,
    sideBar: PropTypes.object
};
export default CustomTabs;
