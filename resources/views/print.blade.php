<html>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="assets/css/print.css">

    <table class="table-noborder">
        <tr>
            <td colspan="6" class="title">
                {{ $cinema->name }} РАСПИСАНИЕ СЕАНСОВ НА {{ $date }}
            </td>
        </tr>
    </table>

    @forelse ($cinema->halls as $hall)
    <table class="table table-striped table-bordered table-condensed">
        <tr class="odd">
            <td colspan="6" class="head">
                {{ $hall->name }} ({{ $hall->note }})
            </td>
        </tr>
        <tr>
            <td style="width: 12%;"><b>Начало</b></td>
            <td style="width: 12%;"><b>Окончание</b></td>
            <td style="width: 45%;" class="left"><b>Название</b></td>
            <td style="width: 12%;"><b>Продолжит.</b></td>
            <td style="width: 12%;"><b>Формат</b></td>
            <td style="width: 12%;"><b>Перерыв</b></td>
        </tr>
        @forelse ($hall->showtimes as $o => $showtime)
            <tr @if ($o % 2 == 0) class="odd" @endif>
                <td>{{ $showtime->start_time }}</td>
                <td>{{ $showtime->end_time }}</td>
                <td class="left">{{ $showtime->movie->name }}</td>
                <td>{{ $showtime->movie->default_duration }}</td>
                <td>{{ $showtime->format }}</td>
                <td>{{ $showtime->break }}</td>
            </tr>
        @empty
            <tr class="odd">
                <td colspan="6">Фильмов нет</td>
            </tr>
        @endforelse
    </table>
    @endforeach

</html>