import React from 'react';

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>Admin Layout</h1>
      {children}
    </div>
  );
};

export default AdminLayout;
