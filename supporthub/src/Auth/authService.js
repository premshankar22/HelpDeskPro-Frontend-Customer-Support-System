import { fakeUsers } from "./fakeUsers";

/* ================= LOGIN ================= */
export function fakeLogin(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = fakeUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        reject("Invalid email or password");
        return;
      }

      resolve({
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,        
        },
        token: "fake-jwt-token",
      });
    }, 1000);
  });
}

/* ================= REGISTER ================= */
export function fakeRegister(name, email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = fakeUsers.find((u) => u.email === email);
      if (exists) {
        reject("User already exists");
        return;
      }

      const newUser = {
        id: fakeUsers.length + 1,
        name,
        email,
        password,
        role: "customer", // 👈 default role
      };

      fakeUsers.push(newUser);

      resolve({
        user: {
          id: newUser.id,
          name: newUser.name, 
          email: newUser.email,
          role: newUser.role,
        },
        token: "fake-jwt-token",
      });
    }, 1000);
  });
}
