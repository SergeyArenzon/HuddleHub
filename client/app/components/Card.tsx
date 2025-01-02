import React from 'react';
import { Parent } from '../lib/propTypes';

export default function Card({
  children,
}: Parent) {
  return (
    <div className="bg-white p-3 rounded-md shadow-md">
      {children}
    </div>
  );
}
