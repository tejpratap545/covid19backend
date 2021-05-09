const IsAdmin = ({ currentAdmin }) => {
  return (
    currentAdmin &&
    (currentAdmin.role === "superadmin" || currentAdmin.role === "admin")
  );
};
const IsSuperAdmin = ({ currentAdmin }) => {
  return (
    currentAdmin &&
    (currentAdmin.role === "superadmin" || currentAdmin.role === "admin")
  );
};

module.exports.IsAdmin = IsAdmin;
module.exports.IsSuperAdmin = IsSuperAdmin;
