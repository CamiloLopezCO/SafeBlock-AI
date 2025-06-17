const mongoose = require("mongoose");

//Define the schema for an incident report
const incidentSchema = new mongoose.Schema({
	title: String, 		//Short title of the incident
	description: String, 	//Full description of what happened
	location: {
		type: { type: String, enum: ['Point'], default: 'Point' }, //GeoJSON type (Point)
		coordinates: [Number], 		// [longitude, latitude]
	},
	severity: String,    //AI-classified lable: "Low", "Moderate", or "Severe"
	timestamp: { type: Date, default: Date.now },   //When the incident was reported 
	createBy: String,    //User ID or email of the reporter (can be expanded to real user reference)
});

//Create a geospatial index to enable proximity searches on the map
incidentSchema.index({ location: "2dsphere" });

//Export the model so we can use it in routes
module.exports = mongoose.model("Incident", incidentSchema);
