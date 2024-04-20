import { Controller, Get, Route } from 'tsoa';

@Route('tests')
export class TestController extends Controller {
  
  @Get('/')
  public async getTests(): Promise<string> {
    return 'Hello from tests!';
  }
}