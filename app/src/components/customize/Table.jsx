
// Imports

import * as React from 'react';

import firebase from 'firebase/app';

import App from '../App';
import TableCell from './TableCell';


// Constants


// Component

export default class Table extends React.Component {

  // Constructor

  constructor() {

    super();

    this.initState();

  }

  initState() {

    this.state = {
      values: undefined,
      activities: undefined
    }

  }


  // Event handlers

  handleValuesValue = (data) => {

    this.setState({
      values: data.val() ? data.val() : { }
    });

  }
  handleActivitiesValue = (data) => {

    this.setState({
      activities: data.val() ? data.val() : { }
    });

  }

  handleWeightChange = (actKey, valLinkKey, weight) => {

    weight  = Math.min(3, Math.max(0, weight));

    this.activitiesRef.child(actKey + '/values/' + valLinkKey).update({
      weight: weight
    });

  }

  // Methods

  deleteActivity(actKey) {

    this.activitiesRef.child(actKey).remove();

  }
  deleteValue(valKey) {

    this.valuesRef.child(valKey).remove();

  }


  // React

  componentDidMount() {

    const userId  = firebase.auth().currentUser.uid;

    this.valuesRef     = firebase.database().ref(`values/${userId}`);
    this.activitiesRef = firebase.database().ref(`activities/${userId}`);

    this.valuesRef.on('value', this.handleValuesValue);
    this.activitiesRef.on('value', this.handleActivitiesValue);

  }

  componentWillUnmount() {

    if (this.valuesRef) this.valuesRef.off('value', this.handleValuesValue);
    if (this.activitiesRef) this.activitiesRef.off('value', this.handleActivitiesValue);

  }

  render() {

    const values     = this.state.values,
          activities = this.state.activities;

    const dataLoaded =
      values !== undefined &&
      activities !== undefined;

    const noData =
      _.isEmpty(values) &&
      _.isEmpty(activities);

    if (!dataLoaded) {
      return (
        <p>Loading...</p>
      );
    } else if (noData) {
      return (
        <p>No data</p>
      );
    }

    return (

      <table
        className='customize-table'>

        <thead>

          <tr>

            <th />

            {_.map(values, (value, valKey) => (
              <th
                key={valKey}>

                {value.label}

                &nbsp;

                <a
                  className='remove-btn'
                  onClick={() => this.deleteValue(valKey)}>
                  &times;
                </a>

              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {_.map(activities, (activity, actKey) => (
            <tr key={actKey}>
              <th>

                {activity.label}

                &nbsp;

                <a
                  className='remove-btn'
                  onClick={() => this.deleteActivity(actKey)}>
                  &times;
                </a>

              </th>

              {_.map(values, (value, valKey) => {

                const valLink = _.find(activity.values, (valLink) => (
                  valLink.value_key === valKey
                ));

                return (
                  <TableCell
                    key={valKey}
                    actKey={actKey}
                    activity={activity}
                    valLinkKey={valKey}
                    onWeightChange={this.handleWeightChange} />
                );

              })}

            </tr>
          ))}
        </tbody>

      </table>

    );

  }

}
