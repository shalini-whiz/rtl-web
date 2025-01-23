import React from "react";
import PropTypes from "prop-types";
import TopAppBar from "../app/TopAppBar";
import InfoBar from "../app/InfoBar";
import AuthService from "../../service/AuthService";
const { Tabs, Tab, Grid, Typography } = require("@mui/material");
const { entityTabs } = require("../../schema/tabSchema/entity-tabs")
const { appDimension } = require("../../constants/colors")

class EntityTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: [],
            tabValue: 0,
            tabItem: undefined,
            TabComponent: undefined
        };
    }

    componentDidMount() {
        console.log(this.props)
        let { entityKey } = this.props;
        let tabs = [...entityTabs[entityKey]];

        if ((entityKey === "products" || entityKey === "orders") && AuthService.getUserRole() === "admin")
            tabs = [...entityTabs[entityKey + "Admin"]]
        if (tabs.length) {
            this.setState({ TabComponent: undefined, tabItem: undefined });
            let item = tabs[0];
            this.setState({ tabValue: item.value, TabComponent: item.component, tabItem: item });
        }
        this.setState({ tabList: tabs });
    }



    tabHandleChange = (e, item) => {
        this.setState({ tabValue: item.value, TabComponent: item.component, tabItem: item });
    };
    render() {
        const { tabList, tabValue, TabComponent, tabItem } = this.state;
        const { classes, title } = this.props;
        return (
            <main>
                <div>
                    <TopAppBar title={tabItem ? (tabItem.toolBarTitle ? tabItem.toolBarTitle : tabItem.title) : title} />
                    <div style={{ width: "100%" }}>
                        <Grid container spacing={3}>
                            <Grid item md={12}>
                                <InfoBar />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item md={12} sm={12} style={{
                                marginLeft: appDimension.pageMargin,
                                padding: 10
                            }}>
                                <Tabs value={tabValue} variant="scrollable" scrollButtons="auto" >
                                    {tabList.map((item, index) => {
                                        return (
                                            <Tab key={index} label={item.title}
                                                onClick={e => this.tabHandleChange(e, item)} />
                                        );
                                    })}
                                </Tabs>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item md={12} sm={12} style={{
                                marginLeft: appDimension.pageMargin,
                                padding: 10
                            }}>
                                {TabComponent ? (<TabComponent data={tabItem} classes={classes} />) :
                                    (this.props.component ? <this.props.component /> : '')}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </main>
        );
    }
}
EntityTabs.propTypes = {
    classes: PropTypes.object,
    role: PropTypes.string,
    sideBar: PropTypes.object
};
export default EntityTabs;
