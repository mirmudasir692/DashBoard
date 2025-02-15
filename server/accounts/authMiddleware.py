from django.utils.deprecation import MiddlewareMixin


class JWTAuthCookieMiddleware(MiddlewareMixin):
    def process_request(self, request):
        print("request", request.COOKIES)
        cookies = request.COOKIES

        print("cookies", cookies)
        access_token = cookies.get("access_token")
        if access_token:
            request.META["HTTP_AUTHORIZATION"] = f"Bearer {access_token}"
