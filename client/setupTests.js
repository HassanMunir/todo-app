global.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  addListener: vi.fn(),
  removeListener: vi.fn(),
}));
