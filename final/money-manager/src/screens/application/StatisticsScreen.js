import React from "react";

import { Text, withStyles } from "@ui-kitten/components";

import { LoadingLayout } from "@components/common";

const ThemedComponent = ({ eva }) => {
  console.log("StatisticsScreen");
  return (
    <LoadingLayout
      style={eva.style.rootLayout}
      loading={true}
      indicatorStyle={eva.style.indicator}
    >
      <Text>Statistics!</Text>
    </LoadingLayout>
  );
}

const StatisticsScreen = withStyles(ThemedComponent, theme => {
  return {
    rootLayout: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    indicator: {
      justifyContent: 'center',
      alignItems: 'center',
      spinnerSize: 'giant',
    },
  };
});

export default StatisticsScreen;
