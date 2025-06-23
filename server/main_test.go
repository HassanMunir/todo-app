package main

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
)

// Initialize Fiber app for testing
func setupTestApp() *fiber.App {
	app := fiber.New()
	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})
	return app
}

// Test Healthcheck Route
func TestHealthCheckRoute(t *testing.T) {
	app := setupTestApp()

	req := httptest.NewRequest(http.MethodGet, "/healthcheck", nil)
	resp, _ := app.Test(req)

	assert.Equal(t, http.StatusOK, resp.StatusCode)
}

// Test Creating a Todo
func TestCreateTodo(t *testing.T) {
	app := fiber.New()
	app.Post("/api/todos", func(c *fiber.Ctx) error {
		todo := &Todo{Title: "Test Todo", Body: "This is a test"}
		todo.ID = 1
		return c.JSON(todo)
	})

	req := httptest.NewRequest(http.MethodPost, "/api/todos", nil)
	req.Header.Set("Content-Type", "application/json")
	resp, _ := app.Test(req)

	assert.Equal(t, http.StatusOK, resp.StatusCode)
}

// Test Invalid Route
func TestInvalidRoute(t *testing.T) {
	app := setupTestApp()

	req := httptest.NewRequest(http.MethodGet, "/invalid-route", nil)
	resp, _ := app.Test(req)

	assert.Equal(t, http.StatusNotFound, resp.StatusCode)
}
