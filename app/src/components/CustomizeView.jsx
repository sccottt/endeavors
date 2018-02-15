
// Imports

import * as React from 'react';
import * as classNames from 'classnames';

import App from './App';
import CustomizeTable from './CustomizeTable';
import CustomizeCategoryForm from './CustomizeCategoryForm';
import CustomizeValueForm from './CustomizeValueForm';
import CustomizeActivityForm from './CustomizeActivityForm';


// Constants


// Component

export default class CustomizeView extends React.Component {

  // Constructor

  constructor() {

    super();

    this.initState();

  }

  initState() { }


  // Event handlers


  // Methods


  // React

  render() {

    const classSection = classNames({
      'customize': true
    })

    return (
      <section
        className={classSection}>

        <header>
          <h2>Customize</h2>
        </header>

        <article>

          <h2>Edit Activities</h2>
          <CustomizeTable />

          <h2>Add new</h2>
          <CustomizeCategoryForm />
          <CustomizeValueForm />
          <CustomizeActivityForm />

        </article>

      </section>

    );

  }

}