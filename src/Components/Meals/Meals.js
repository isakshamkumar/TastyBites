import React, { Fragment } from 'react'
import MealsSummary from './MealsSummary'
import AvailableMeals from './AvailableMeals'

export default function Meals() {
  console.log('meals.js');
  return (
    <>
    <MealsSummary/>
    <AvailableMeals/>
    </>
  )
}
