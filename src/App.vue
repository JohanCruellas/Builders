<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Mgo+DSMBaFt/QHRqVVhlX1pFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jSn9QdkNmWXteeXdURw==;Mgo+DSMBPh8sVXJ0S0J+XE9BdVRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31TdURgWXlbcHBVT2RaUA==;ORg4AjUWIQA/Gnt2VVhkQlFac1xJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkZiWn9YdXRRRmlaUUU=;MTMxMDg1NEAzMjMwMmUzNDJlMzBpNlArV0lKdDFVcHc3ZGx4QmlNMFpMVVhtMTJJYjk0MUNRZS9FMzBZRFVvPQ==;MTMxMDg1NUAzMjMwMmUzNDJlMzBXZzJ4YlN6My9jc0NxcUFJVDZmQWJ2TFZ1N3o3QVc4SGIzY3lNaEFsdGw4PQ==;NRAiBiAaIQQuGjN/V0Z+WE9EaFpBVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RdUVgWHxednFVQmFcVUZ3;MTMxMDg1N0AzMjMwMmUzNDJlMzBhNTlSRmRheHdBYWN1ZGt5cHUwOFZvb3huTTZIb1NlcExBdFdrM0wvVytJPQ==;MTMxMDg1OEAzMjMwMmUzNDJlMzBDU3dFeHYrVU5vSGZ5ZUlTWmppdGdPU2dyN0J3dVlOVUxNZTNwTWlzMlJjPQ==;Mgo+DSMBMAY9C3t2VVhkQlFac1xJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkZiWn9YdXRRR2FeV0U=;MTMxMDg2MEAzMjMwMmUzNDJlMzBnQzdsMTJFSEtxVzNBWjU1MGp5S3doVHlIOTY5NXpwYnVCdi9wcXBodlRvPQ==;MTMxMDg2MUAzMjMwMmUzNDJlMzBVR2ZiZVc4Y25PN3BERzhML2F1VTZTelNQaUU1YXdHWUhoZnd0dlJoNlBrPQ==;MTMxMDg2MkAzMjMwMmUzNDJlMzBhNTlSRmRheHdBYWN1ZGt5cHUwOFZvb3huTTZIb1NlcExBdFdrM0wvVytJPQ==')
const app = createApp({});

const pinia = createPinia();
app.use(pinia);

export default defineComponent({
  name: "App"
});
</script>

<style>
@import '../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../node_modules/@syncfusion/ej2-lists/styles/material.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import '../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
@import "../node_modules/@syncfusion/ej2-vue-documenteditor/styles/material.css";

.title {
  text-align: center;
  font-size: 2em;
}
</style>
