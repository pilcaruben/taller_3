const { mongoose, connectDB } = require("../src/database");
const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../app");

let empleadoCreado = null; // guardamos para reutilizar el ID

before(async () => {
    await connectDB();
});

after(async () => {
    await mongoose.connection.close();
});

describe("API Empleados", () => {
    it("GET /api/empleados → debe devolver lista de empleados", async () => {
        const res = await request(app).get("/api/empleados");

        expect(res.status).to.equal(200);
        expect(Array.isArray(res.body)).to.be.true;

        if (res.body.length > 0) {
            const empleado = res.body[0];
            expect(empleado).to.have.property("_id");
            expect(empleado).to.have.property("nombre");
            expect(empleado).to.have.property("departamento");
            expect(empleado).to.have.property("sueldo");
        }
    });

    it("POST /api/empleados → debe crear un nuevo empleado", async () => {
        const data = {
            nombre: "Carlos Pérez",
            cargo: "Desarrollador",
            departamento: "Sistemas",
            sueldo: 1800
        };

        const res = await request(app)
            .post("/api/empleados")
            .send(data)
            .set("Accept", "application/json");

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("message", "Empleado creado");
        expect(res.body.empleado).to.include(data);

        // guardar el id para pruebas posteriores
        empleadoCreado = res.body.empleado;
    });

    it("GET /api/empleados/:id → debe mostrar un empleado por ID", async () => {
        const res = await request(app).get(`/api/empleados/${empleadoCreado._id}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("_id", empleadoCreado._id);
        expect(res.body).to.have.property("nombre", empleadoCreado.nombre);
        expect(res.body).to.have.property("cargo", empleadoCreado.cargo);
        expect(res.body).to.have.property("departamento", empleadoCreado.departamento);
        expect(res.body).to.have.property("sueldo", empleadoCreado.sueldo);
    });

    it("DELETE /api/empleados/:id → debe eliminar un empleado por ID", async () => {
        const res = await request(app).delete(`/api/empleados/${empleadoCreado._id}`);

        expect(res.status).to.be.oneOf([200, 204]);
        // si devuelves mensaje, valida así:
        if (res.body.message) {
            expect(res.body).to.have.property("message").that.includes("eliminado");
        }
    });

    it("DELETE /api/empleados/:id (400) → ID inválido (no ObjectId)", async () => {
        const res = await request(app).delete("/api/empleados/prueba");
        expect(res.status).to.equal(400);
        // si usas el middleware, el body sería { error: 'ID inválido' }
    });
});
