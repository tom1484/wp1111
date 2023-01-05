import React from "react";

import { Text, withStyles } from "@ui-kitten/components";

import { LoadingLayout } from "@components/common";

const ThemedComponent = ({ eva }) => {
  console.log("TransactionsScreen");
  return (
    <LoadingLayout
      style={eva.style.rootLayout}
      loading={true}
      indicatorStyle={eva.style.indicator}
    >
      <Text>Transaction!</Text>
    </LoadingLayout>
  );
}

const TransactionsScreen = withStyles(ThemedComponent, theme => {
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

export default TransactionsScreen;
