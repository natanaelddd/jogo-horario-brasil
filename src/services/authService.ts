
export class AuthService {
  private static instance: AuthService;
  private isAuthenticated = false;

  private constructor() {
    // Verificar se já está logado
    this.isAuthenticated = localStorage.getItem('admin_logged_in') === 'true';
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  login(username: string, password: string): boolean {
    if (username === 'horariodojogo' && password === 'horariodojogo@12345') {
      this.isAuthenticated = true;
      localStorage.setItem('admin_logged_in', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('admin_logged_in');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
