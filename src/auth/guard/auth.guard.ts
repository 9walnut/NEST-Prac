@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  canActivate(context: ExecutionContext): any {
    return super.canActivate(context);
  }
}